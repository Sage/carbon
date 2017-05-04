import mock from 'xhr-mock';
import escapeStringRegexp from 'escape-string-regexp';
import countries from './data/countries';

export function disableMock() {
  mock.teardown();
}

export function enableMock() {
  mock.setup();

  mock.get(/countries/, (req, res) => {
    let query = req.query(),
        filter = query.value || query.name || "",
        filteredCountries = countries,
        text = decodeURIComponent(filter),
        page = Number(query.page),
        rows = Number(query.rows),
        skip = (page - 1) * rows,
        regex = new RegExp(escapeStringRegexp(text), "i");

    filteredCountries = filteredCountries.filter((item) => {
      return item.get('name').search(regex) > -1;
    });

    if (query.sord && query.sidx) {
      filteredCountries = filteredCountries.sort((a, b) => {
        if (query.sord === "asc") {
          return a.get(query.sidx).localeCompare(b.get(query.sidx));
        } else {
          return b.get(query.sidx).localeCompare(a.get(query.sidx));
        }
      });
    }

    let numberOfResults = filteredCountries.count();

    let i = 0;
    filteredCountries = filteredCountries.skip(skip).takeUntil(() => {
      i++;
      return(i == (rows + 1));
    });

    let data = {
      rows: filteredCountries.toJS(),
      records: numberOfResults,
      current_page: page,
      data:  [{items: filteredCountries, page: page, records: numberOfResults }]
    };

    return res
      .status(201)
      .header('Content-Type', 'application/json')
      .body(JSON.stringify(data));
  });
}
