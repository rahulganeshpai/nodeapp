export default function (context, options) {
    return {
      name: 'custom-docusaurus-plugin',
      configureWebpack(config, isServer, utils) {
        const {getJSLoader} = utils;
        return {
          module: {
            rules: [
              {
                test: /\.ya?ml$/,
                use: [getJSLoader(isServer), 'yaml-loader'],
              }
            ],
          },
        };
      },
    };
  }
  
  