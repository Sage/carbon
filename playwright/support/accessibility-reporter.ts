/* eslint-disable no-console */
import type {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";
import * as fs from "fs";
import * as path from "path";

interface A11yIssue {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes?: Array<{
    html: string;
    target: string[];
    failureSummary?: string;
  }>;
}

interface A11yRecord {
  component: string;
  testFile: string;
  testTitle: string;
  status: "incomplete" | "violation";
  issues: A11yIssue[];
  timestamp: string;
}

class AccessibilityReporter implements Reporter {
  private records: A11yRecord[] = [];
  private outputDir: string;

  constructor() {
    this.outputDir = path.resolve(__dirname, "../test-report");
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    // Extract accessibility data from attachments
    const incompleteAttachment = result.attachments.find(
      (a) => a.name === "accessibility-incomplete.json",
    );
    const violationsAttachment = result.attachments.find(
      (a) => a.name === "accessibility-violations.json",
    );

    const componentName = this.extractComponentName(test.location.file);
    const testFile = test.location.file.replace(process.cwd(), "");

    if (incompleteAttachment?.body) {
      const issues = JSON.parse(incompleteAttachment.body.toString());
      this.records.push({
        component: componentName,
        testFile,
        testTitle: test.title,
        status: "incomplete",
        issues,
        timestamp: new Date().toISOString(),
      });
    }

    if (violationsAttachment?.body) {
      const issues = JSON.parse(violationsAttachment.body.toString());
      this.records.push({
        component: componentName,
        testFile,
        testTitle: test.title,
        status: "violation",
        issues,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onEnd(_result: FullResult): Promise<void> {
    const violationCount = this.records.filter(
      (r) => r.status === "violation",
    ).length;

    if (this.records.length === 0) {
      console.log("✓ No accessibility issues detected");
      return;
    }

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Write JSON data
    const jsonPath = path.join(this.outputDir, "accessibility-report.json");
    fs.writeFileSync(jsonPath, JSON.stringify(this.records, null, 2));

    // Generate HTML report
    const htmlPath = path.join(this.outputDir, "accessibility-report.html");
    fs.writeFileSync(htmlPath, this.generateHTML());

    console.log(
      `\n📊 Accessibility Report: ${this.records.length} issue(s) found`,
    );
    console.log(`   HTML: ${htmlPath}`);
    console.log(`   JSON: ${jsonPath}\n`);

    if (violationCount > 0) {
      process.exitCode = 1;
    }
  }

  private extractComponentName(filePath: string): string {
    const match = filePath.match(/components\/([^/]+)\//);
    return match ? match[1] : "Unknown";
  }

  private generateHTML(): string {
    const incompleteCount = this.records.filter(
      (r) => r.status === "incomplete",
    ).length;
    const violationCount = this.records.filter(
      (r) => r.status === "violation",
    ).length;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carbon Accessibility Report</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        header {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        h1 { color: #333; font-size: 28px; margin-bottom: 10px; }
        .summary {
            display: flex;
            gap: 20px;
            margin-top: 20px;
        }
        .stat {
            flex: 1;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
        }
        .stat.incomplete { background: #fff3cd; border-left: 4px solid #ffc107; }
        .stat.violation { background: #f8d7da; border-left: 4px solid #dc3545; }
        .stat-number { font-size: 32px; font-weight: bold; }
        .stat-label { color: #666; font-size: 14px; }
        .filters {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .filter-group {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
        }
        .filter-group label { font-weight: 500; color: #555; }
        .filter-group input, .filter-group select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        .filter-group input[type="text"] { min-width: 300px; }
        .record {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 15px;
        }
        .record.hidden { display: none; }
        .record-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .record-title { flex: 1; }
        .component-name {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .test-name {
            color: #666;
            font-size: 14px;
            margin-bottom: 3px;
        }
        .test-file {
            color: #999;
            font-size: 12px;
            font-family: 'Monaco', 'Courier New', monospace;
        }
        .badge {
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .badge.incomplete { background: #ffc107; color: #000; }
        .badge.violation { background: #dc3545; color: white; }
        .issue {
            background: #f8f9fa;
            padding: 15px;
            border-left: 3px solid #6c757d;
            margin-bottom: 10px;
            border-radius: 4px;
        }
        .issue.critical { border-left-color: #dc3545; }
        .issue.serious { border-left-color: #fd7e14; }
        .issue.moderate { border-left-color: #ffc107; }
        .issue.minor { border-left-color: #17a2b8; }
        .issue-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .issue-id {
            font-weight: 600;
            color: #333;
            font-size: 15px;
        }
        .impact-badge {
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .impact-badge.critical { background: #dc3545; color: white; }
        .impact-badge.serious { background: #fd7e14; color: white; }
        .impact-badge.moderate { background: #ffc107; color: #000; }
        .impact-badge.minor { background: #17a2b8; color: white; }
        .issue-description { color: #555; margin-bottom: 8px; }
        .issue-help {
            font-size: 13px;
            color: #666;
            margin-bottom: 8px;
        }
        .issue-link {
            font-size: 13px;
        }
        .issue-link a {
            color: #007bff;
            text-decoration: none;
        }
        .issue-link a:hover { text-decoration: underline; }
        .nodes-section {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #dee2e6;
        }
        .nodes-title {
            font-size: 13px;
            font-weight: 600;
            color: #555;
            margin-bottom: 8px;
        }
        .node {
            background: white;
            padding: 10px;
            border-radius: 3px;
            margin-bottom: 8px;
            font-size: 12px;
        }
        .node-target {
            color: #0066cc;
            font-family: 'Monaco', 'Courier New', monospace;
            margin-bottom: 5px;
        }
        .node-html {
            color: #666;
            font-family: 'Monaco', 'Courier New', monospace;
            white-space: pre-wrap;
            word-break: break-all;
            background: #f8f9fa;
            padding: 8px;
            border-radius: 3px;
            margin-top: 5px;
        }
        .no-results {
            text-align: center;
            padding: 40px;
            color: #999;
            font-style: italic;
        }
        .export-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        .btn-primary { background: #007bff; color: white; }
        .btn-primary:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Carbon Accessibility Report</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <div class="summary">
                <div class="stat incomplete">
                    <div class="stat-number">${incompleteCount}</div>
                    <div class="stat-label">Incomplete Checks</div>
                </div>
                <div class="stat violation">
                    <div class="stat-number">${violationCount}</div>
                    <div class="stat-label">Violations</div>
                </div>
            </div>
            <div class="export-buttons">
                <button class="btn btn-primary" onclick="exportToCSV()">Export to CSV</button>
                <button class="btn btn-primary" onclick="downloadJSON()">Download JSON</button>
            </div>
        </header>

        <div class="filters">
            <div class="filter-group">
                <label>Search:</label>
                <input type="text" id="searchInput" placeholder="Search component, test, or issue..." onkeyup="applyFilters()">
                
                <label>Type:</label>
                <select id="typeFilter" onchange="applyFilters()">
                    <option value="all">All</option>
                    <option value="incomplete">Incomplete Only</option>
                    <option value="violation">Violations Only</option>
                </select>
                
                <label>Impact:</label>
                <select id="impactFilter" onchange="applyFilters()">
                    <option value="all">All</option>
                    <option value="critical">Critical</option>
                    <option value="serious">Serious</option>
                    <option value="moderate">Moderate</option>
                    <option value="minor">Minor</option>
                </select>
            </div>
        </div>

        <div id="records">
            ${this.records.map((record, idx) => this.generateRecordHTML(record, idx)).join("")}
        </div>
        
        <div id="noResults" class="no-results" style="display: none;">
            No accessibility issues match your filters.
        </div>
    </div>

    <script>
        const records = ${JSON.stringify(this.records)};
        
        function applyFilters() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const typeFilter = document.getElementById('typeFilter').value;
            const impactFilter = document.getElementById('impactFilter').value;
            
            const recordElements = document.querySelectorAll('.record');
            let visibleCount = 0;
            
            recordElements.forEach((element, idx) => {
                const record = records[idx];
                let visible = true;
                
                // Type filter
                if (typeFilter !== 'all' && record.status !== typeFilter) {
                    visible = false;
                }
                
                // Impact filter
                if (impactFilter !== 'all') {
                    const hasImpact = record.issues.some(issue => 
                        issue.impact === impactFilter
                    );
                    if (!hasImpact) visible = false;
                }
                
                // Search filter
                if (searchTerm) {
                    const searchableText = [
                        record.component,
                        record.testTitle,
                        record.testFile,
                        ...record.issues.map(i => i.id + i.description + i.help)
                    ].join(' ').toLowerCase();
                    
                    if (!searchableText.includes(searchTerm)) {
                        visible = false;
                    }
                }
                
                element.classList.toggle('hidden', !visible);
                if (visible) visibleCount++;
            });
            
            document.getElementById('noResults').style.display = 
                visibleCount === 0 ? 'block' : 'none';
        }
        
        function exportToCSV() {
            let csv = 'Component,Test File,Test Name,Status,Issue ID,Impact,Description,Help,Help URL\\n';
            
            records.forEach(record => {
                record.issues.forEach(issue => {
                    csv += [
                        record.component,
                        record.testFile,
                        record.testTitle,
                        record.status,
                        issue.id,
                        issue.impact || 'N/A',
                        issue.description.replace(/"/g, '""'),
                        issue.help.replace(/"/g, '""'),
                        issue.helpUrl
                    ].map(v => '"' + v + '"').join(',') + '\\n';
                });
            });
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carbon-accessibility-report.csv';
            a.click();
        }
        
        function downloadJSON() {
            const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carbon-accessibility-report.json';
            a.click();
        }
    </script>
</body>
</html>`;
  }

  private generateRecordHTML(record: A11yRecord, idx: number): string {
    return `
        <div class="record" data-index="${idx}">
            <div class="record-header">
                <div class="record-title">
                    <div class="component-name">${this.escapeHtml(record.component)}</div>
                    <div class="test-name">${this.escapeHtml(record.testTitle)}</div>
                    <div class="test-file">${this.escapeHtml(record.testFile)}</div>
                </div>
                <span class="badge ${record.status}">${record.status}</span>
            </div>
            ${record.issues.map((issue) => this.generateIssueHTML(issue)).join("")}
        </div>`;
  }

  private generateIssueHTML(issue: A11yIssue): string {
    const impactClass = issue.impact || "minor";
    return `
            <div class="issue ${impactClass}">
                <div class="issue-header">
                    <span class="issue-id">${this.escapeHtml(issue.id)}</span>
                    ${issue.impact ? `<span class="impact-badge ${impactClass}">${this.escapeHtml(issue.impact)}</span>` : ""}
                </div>
                <div class="issue-description">${this.escapeHtml(issue.description)}</div>
                <div class="issue-help">${this.escapeHtml(issue.help)}</div>
                <div class="issue-link">
                    <a href="${this.escapeHtml(issue.helpUrl)}" target="_blank" rel="noopener noreferrer">
                        More information →
                    </a>
                </div>
                ${issue.nodes && issue.nodes.length > 0 ? this.generateNodesHTML(issue.nodes) : ""}
            </div>`;
  }

  private generateNodesHTML(
    nodes: Array<{ html: string; target: string[]; failureSummary?: string }>,
  ): string {
    return `
                <div class="nodes-section">
                    <div class="nodes-title">Affected Elements (${nodes.length}):</div>
                    ${nodes
                      .map(
                        (node) => `
                    <div class="node">
                        <div class="node-target">Target: ${this.escapeHtml(node.target.join(", "))}</div>
                        ${node.failureSummary ? `<div style="color: #dc3545; margin-bottom: 5px; font-size: 12px;">${this.escapeHtml(node.failureSummary)}</div>` : ""}
                        <div class="node-html">${this.escapeHtml(node.html.substring(0, 300))}${node.html.length > 300 ? "..." : ""}</div>
                    </div>`,
                      )
                      .join("")}
                </div>`;
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

export default AccessibilityReporter;
