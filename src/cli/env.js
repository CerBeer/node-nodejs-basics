const parseEnv = () => {
  const envRSS = new Array;  
  const env = process.env;
  for (let key in env) {
    if (key.startsWith('RSS_')) envRSS.push(`${key}=${env[key]}`);
  }
  if (envRSS.length) console.log(envRSS.join('; '));
};

parseEnv();