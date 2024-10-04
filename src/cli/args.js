const parseArgs = () => {
  const argsRSS = new Array;  
  const args = process.argv;
  let prevIsKey = false;
  let currArg = '';
  args.forEach((val) => {
    const currIsKey = val.startsWith('--');
    if (!prevIsKey && currIsKey) {
      currArg = val.slice(2);
    } else if (prevIsKey && !currIsKey) {
      argsRSS.push(`${currArg} is ${val}`);
      currArg = '';
    } else if (prevIsKey && currIsKey) {
      argsRSS.push(`${currArg}`);
      currArg = val.slice(2);
    };
    prevIsKey = currIsKey;
  });
  if (prevIsKey) argsRSS.push(`${currArg}`);
  if (argsRSS.length) console.log(argsRSS.join(', '));
};

parseArgs();