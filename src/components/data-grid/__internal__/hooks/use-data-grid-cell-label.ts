import useLocale from "../../../../hooks/__internal__/useLocale";
import enGB from "../../../../locales/en-gb";

const useDataGridCellLabel = (header: string, rowIndex: number) => {
  const locale = useLocale();
  const formatter = (locale.dataGrid ?? enGB.dataGrid).cellLabel;
  return formatter(header, rowIndex + 1);
};

export default useDataGridCellLabel;
