interface LocaleFormats {
  formats: string[];
  format: string;
}

declare function getFormatData({ code: string }): LocaleFormats;

export default getFormatData;
