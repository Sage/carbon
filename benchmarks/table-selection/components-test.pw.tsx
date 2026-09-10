import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import { Checkbox } from "../../src/components/checkbox";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableCheckbox,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "../../src/components/flat-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/table";

/** Shared workload size for both benchmark implementations. */
export const TABLE_BENCHMARK_ROW_COUNT = 500;

const rows = Array.from({ length: TABLE_BENCHMARK_ROW_COUNT }, (_, index) => ({
  id: index + 1,
  product: `Product ${index + 1}`,
  type: index % 2 === 0 ? "Standard" : "Premium",
  status: index % 3 === 0 ? "Inactive" : "Active",
}));
const rowIds = rows.map(({ id }) => id);
const individualRowId = Math.ceil(TABLE_BENCHMARK_ROW_COUNT / 2);

type Operation =
  | "select-all"
  | "clear-all"
  | "select-individual"
  | "deselect-individual";

export interface TableSelectionMeasurement {
  sequence: number;
  operation: Operation;
  selectedRowCount: number;
  settledDurationMs: number;
}

interface PendingMeasurement {
  sequence: number;
  operation: Operation;
  selectedRowCount: number;
  startTime: number;
}

export interface TableSelectionBenchmarkProps {
  kind: "table" | "flat-table";
}

const NewSelectableTable = ({
  selectedRows,
}: {
  selectedRows: ReadonlySet<number>;
}) => (
  <Table variant="prominent">
    <TableHead>
      <TableRow id="new-table-header">
        <TableHeader id="new-table-select-all">
          <Checkbox
            aria-label="Select all rows"
            checked={selectedRows.size === TABLE_BENCHMARK_ROW_COUNT}
            onChange={() => {}}
          />
        </TableHeader>
        <TableHeader>Product</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(({ id, product, type, status }) => (
        <TableRow
          key={id}
          id={`new-table-row-${id}`}
          isSelected={selectedRows.has(id)}
        >
          <TableCell id={`new-table-row-${id}-select`}>
            <Checkbox
              aria-label={`Select ${product}`}
              checked={selectedRows.has(id)}
              onChange={() => {}}
            />
          </TableCell>
          <TableCell>{product}</TableCell>
          <TableCell>{type}</TableCell>
          <TableCell>{status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const LegacySelectableTable = ({
  selectedRows,
}: {
  selectedRows: ReadonlySet<number>;
}) => (
  <FlatTable>
    <FlatTableHead>
      <FlatTableRow id="flat-table-header">
        <FlatTableCheckbox
          as="th"
          checked={selectedRows.size === TABLE_BENCHMARK_ROW_COUNT}
          onChange={() => {}}
          ariaLabelledBy="flat-table-product-header"
        />
        <FlatTableHeader id="flat-table-product-header">
          Product
        </FlatTableHeader>
        <FlatTableHeader>Type</FlatTableHeader>
        <FlatTableHeader>Status</FlatTableHeader>
      </FlatTableRow>
    </FlatTableHead>
    <FlatTableBody>
      {rows.map(({ id, product, type, status }) => (
        <FlatTableRow
          key={id}
          id={`flat-table-row-${id}`}
          selected={selectedRows.has(id)}
        >
          <FlatTableCheckbox
            checked={selectedRows.has(id)}
            onChange={() => {}}
            ariaLabelledBy={`flat-table-row-${id}-product`}
          />
          <FlatTableCell id={`flat-table-row-${id}-product`}>
            {product}
          </FlatTableCell>
          <FlatTableCell>{type}</FlatTableCell>
          <FlatTableCell>{status}</FlatTableCell>
        </FlatTableRow>
      ))}
    </FlatTableBody>
  </FlatTable>
);

export const TableSelectionBenchmark = ({
  kind,
}: TableSelectionBenchmarkProps) => {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const resultRef = useRef<HTMLOutputElement>(null);
  const sequenceRef = useRef(0);
  const pendingMeasurementRef = useRef<PendingMeasurement>();

  useLayoutEffect(() => {
    const result = resultRef.current;
    const pendingMeasurement = pendingMeasurementRef.current;

    if (!result) return;

    if (!pendingMeasurement) {
      const mountMark = performance.getEntriesByName(
        "table-benchmark-mount-start",
        "mark",
      )[0];

      if (mountMark) {
        result.dataset.mountDuration = String(
          performance.now() - mountMark.startTime,
        );
      }

      return;
    }

    const measurement = {
      sequence: pendingMeasurement.sequence,
      operation: pendingMeasurement.operation,
      selectedRowCount: pendingMeasurement.selectedRowCount,
    };

    pendingMeasurementRef.current = undefined;

    requestAnimationFrame(() => {
      const settledMeasurement: TableSelectionMeasurement = {
        ...measurement,
        settledDurationMs: performance.now() - pendingMeasurement.startTime,
      };

      result.dataset.sequence = String(settledMeasurement.sequence);
      result.dataset.measurement = JSON.stringify(settledMeasurement);
      result.dataset.selectedRowCount = String(
        settledMeasurement.selectedRowCount,
      );
    });
  }, [selectedRows]);

  const updateSelection = useCallback(
    (
      operation: Operation,
      selectedRowCount: number,
      update: React.SetStateAction<ReadonlySet<number>>,
    ) => {
      sequenceRef.current += 1;
      pendingMeasurementRef.current = {
        sequence: sequenceRef.current,
        operation,
        selectedRowCount,
        startTime: performance.now(),
      };
      setSelectedRows(update);
    },
    [],
  );

  const toggleIndividualRow = useCallback(() => {
    const willSelect = !selectedRows.has(individualRowId);

    updateSelection(
      willSelect ? "select-individual" : "deselect-individual",
      willSelect ? 1 : 0,
      (previousRows) => {
        const nextRows = new Set(previousRows);

        if (willSelect) {
          nextRows.add(individualRowId);
        } else {
          nextRows.delete(individualRowId);
        }

        return nextRows;
      },
    );
  }, [selectedRows, updateSelection]);

  const controls = (
    <div>
      <button
        type="button"
        data-benchmark-action="select-all"
        onClick={() =>
          updateSelection(
            "select-all",
            TABLE_BENCHMARK_ROW_COUNT,
            new Set(rowIds),
          )
        }
      >
        Select all
      </button>
      <button
        type="button"
        data-benchmark-action="clear-all"
        onClick={() => updateSelection("clear-all", 0, new Set())}
      >
        Clear all
      </button>
      <button
        type="button"
        data-benchmark-action="toggle-individual"
        onClick={toggleIndividualRow}
      >
        Toggle individual row
      </button>
      <output data-benchmark-result ref={resultRef} />
    </div>
  );

  return (
    <div data-benchmark-component={kind}>
      {controls}
      {kind === "table" ? (
        <NewSelectableTable selectedRows={selectedRows} />
      ) : (
        <LegacySelectableTable selectedRows={selectedRows} />
      )}
    </div>
  );
};
