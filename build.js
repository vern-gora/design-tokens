import StyleDictionaryPackage from 'style-dictionary';

// Реєстрація формату SCSS змінних
StyleDictionaryPackage.registerFormat({
  name: 'scss/variables',
  format: function (dictionary, config) {
    return `${this.selector} {
      ${dictionary.allProperties.map(prop => `  $${prop.name}: ${prop.value};`).join('\n')}
    }`;
  }
});

// Функція для перетворення в kebab-case
function kebabIt(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase();
}

// // Функція для отримання базового розміру шрифту
// function getBasePxFontSize(options) {
//   return (options && options.basePxFontSize) || 16;
// }

// // Перетворення значень px у rem
// function fontPxToRem(token, options) {
//   const baseFont = getBasePxFontSize(options);
//   const floatVal = parseFloat(token.value);
//   if (isNaN(floatVal)) {
//     console.log('NaN error', token.name, token.value, 'rem');
//   }
//   if (floatVal === 0) {
//     return '0';
//   }
//   return `${floatVal / baseFont}rem`;
// }

// function myTransformFunctionRm(token, options) {
// 	return fontPxToRem(token, options)
// }

// // Реєстрація трансформу для перетворення px у rem
// StyleDictionaryPackage.registerTransform({
//   name: 'size/pxToRem',
//   type: 'value',
//   matcher: (token) => ['fontSizes'].includes(token.type),
//   transformer: myTransformFunctionRm
// });

// function myTransformFunctionPx(prop) {
// 	return parseFloat(prop.original.value) + 'px';
// }

// // Реєстрація трансформу для додавання одиниці 'px'
// StyleDictionaryPackage.registerTransform({
//   name: 'sizes/px',
//   type: 'value',
//   matcher: function(prop) {
//     return ["fontSize", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
//   },
//   transformer: myTransformFunctionPx
// });

// Функція для отримання конфігурації Style Dictionary для тем
function getStyleDictionaryConfig(theme) {
  return {
    "source": [
      `input/${theme}.json`,
    ],
    "platforms": {
      "web": {
        "transforms": 
          ["attribute/cti", "name/cti/kebab", "sizes/px", "size/pxToRem"],
        "buildPath": `output/`,
        "files": [{
          "destination": `${theme}.scss`,
          "format": "scss/variables",
          "selector": `.${theme}-theme`
        }]
      }
    }
  };
}

console.log('Build started...');

// Обробка тем 'design-tokens' і 'colors-tokens'
['design-tokens', 'colors-tokens'].map(function (theme) {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${theme}]`);

  const StyleDictionary = new StyleDictionaryPackage(getStyleDictionaryConfig(theme));

  StyleDictionary.buildPlatform('web');

  console.log('\nEnd processing');
});

console.log('\n==============================================');
console.log('\nBuild completed!');
