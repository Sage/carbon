```tsx
export const DismissibleBox: StoryObj = () => {
  return (
    <Box
      display="flex"
      padding="var(--spacing250) var(--spacing300) var(--spacing250) var(--spacing250)"
      justifyContent="space-between"
      borderRadius="borderRadius100"
    >
      <Typography mb={0}>
        Well, that's certainly good to know. Your head is not an artifact! Maybe
        if we felt any human loss as keenly as we feel one of those close to us,
        human history would be far less bloody. Wouldn't that bring about chaos?
        Shields up! Rrrrred alert! Travel time to the nearest starbase? I'm
        afraid I still don't understand, sir. You enjoyed that. The Enterprise
        computer system is controlled by three primary main processor cores,
        cross-linked with a redundant melacortz ramistat, fourteen kiloquad
        interface modules. Well, that's certainly good to know. Your head is not
        an artifact! Rrrrred alert! Rrrrred alert! Rrrrred alert!
      </Typography>
      <Divider p="var(--spacing000)" px="var(--spacing110)" />
      <Image
        alt="Example alt text"
        src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='120'%20height='100'%20viewBox='0%200%20120%20100'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter%20id='b'%20width='200%25'%20height='200%25'%20x='-50%25'%20y='-50%25'%20filterUnits='objectBoundingBox'%3e%3cfeOffset%20dx='1'%20dy='4'%20in='SourceAlpha'%20result='shadowOffsetOuter1'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20in='shadowOffsetOuter1'%20result='shadowBlurOuter1'/%3e%3cfeColorMatrix%20values='0%200%200%200%200.0666666667%200%200%200%200%200.0666666667%200%200%200%200%200.0666666667%200%200%200%200.2%200'%20in='shadowBlurOuter1'%20result='shadowMatrixOuter1'/%3e%3cfeMerge%3e%3cfeMergeNode%20in='shadowMatrixOuter1'/%3e%3cfeMergeNode%20in='SourceGraphic'/%3e%3c/feMerge%3e%3c/filter%3e%3cpath%20id='a'%20d='M38.226%2017.253L.766.613l9.883%2039.78%2010.19-8.552L35.95%2049.85l7.194-6.036-15.11-18.007z'/%3e%3cmask%20id='c'%20width='48.379'%20height='55.236'%20x='-3'%20y='-3'%3e%3cpath%20fill='%23fff'%20d='M-2.235-2.388h48.38v55.236h-48.38z'/%3e%3cuse%20xlink:href='%23a'/%3e%3c/mask%3e%3c/defs%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20fill='%233592FF'%20d='M55%2058.06c8.284%200%2015-6.724%2015-15.018s-6.716-15.018-15-15.018c-8.284%200-15%206.724-15%2015.018S46.716%2058.06%2055%2058.06zm0-5.006c5.523%200%2010-4.482%2010-10.012S60.523%2033.03%2055%2033.03s-10%204.483-10%2010.012c0%205.53%204.477%2010.012%2010%2010.012z'/%3e%3cpath%20fill='%233592FF'%20fill-opacity='.3'%20d='M55%2068.072c13.807%200%2025-11.206%2025-25.03%200-13.824-11.193-25.03-25-25.03s-25%2011.206-25%2025.03c0%2013.824%2011.193%2025.03%2025%2025.03zm0-5.006c11.046%200%2020-8.965%2020-20.024%200-11.06-8.954-20.024-20-20.024s-20%208.965-20%2020.024c0%2011.06%208.954%2020.024%2020%2020.024z'/%3e%3cpath%20fill='%233592FF'%20fill-opacity='.1'%20d='M55%2078.084c19.33%200%2035-15.69%2035-35.042C90%2023.69%2074.33%208%2055%208S20%2023.69%2020%2043.042c0%2019.353%2015.67%2035.042%2035%2035.042zm0-5.006c16.57%200%2030-13.447%2030-30.036%200-16.588-13.43-30.036-30-30.036S25%2026.454%2025%2043.042c0%2016.59%2013.43%2030.036%2030%2030.036z'/%3e%3cg%20filter='url(%23b)'%20transform='translate(56%2042)'%3e%3cuse%20fill='%23ED1C5F'%20xlink:href='%23a'/%3e%3cuse%20stroke='%23FFF'%20stroke-width='6'%20mask='url(%23c)'%20xlink:href='%23a'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
        width="var(--sizing1500)"
      />
      <Box alignSelf="start">
        <IconButton>
          <Icon type="close" />
        </IconButton>
      </Box>
    </Box>
  );
};
```