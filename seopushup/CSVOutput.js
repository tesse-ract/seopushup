const allFunctions = require('./allFunction.js');
const ExcelJS = require('exceljs');
const csv = require('csv-parser');
const fs = require('fs');

// Function to read the CSV file and parse the URLs and keywords
async function readCSV(filePath) {
    const urlsAndKeywords = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                urlsAndKeywords.push({ url: row.url, keyword: row.keyword });
            })
            .on('end', () => {
                resolve(urlsAndKeywords);
            })
            .on('error', reject);
    });
}

async function getData(url, keyword) {
    const obj1 = await allFunctions.ProtocolChecker(url);
    const obj2 = await allFunctions.pageSpeedInsightsChecker(url);
    const obj3 = await allFunctions.keywordDensityChecker(url, keyword);
    const obj4 = await allFunctions.h1Checker(url, keyword);
    const obj5 = await allFunctions.MetaDescriptionChecker(url, keyword);
    const obj6 = await allFunctions.calculateTextToHTMLRatioChecker(url);
    const obj7 = await allFunctions.UrlChecker(url, keyword);
    const obj8 = await allFunctions.pageTitleChecker(url, keyword);
    const obj9 = await allFunctions.altTagKeywordChecker(url, keyword);
    const StringOfObj9 = JSON.stringify(obj9);
    const obj10 = await allFunctions.altTagLengthChecker(url, keyword);
    const StringOfObj10 = JSON.stringify(obj10);
    const obj11 = await allFunctions.BrokenLinkChecker(url);
    const FinalObj = {
        protocol: obj1, ...obj2, ...obj3, ...obj4, ...obj5, ...obj6, ...obj7, ...obj8, url, keyword,
        altTagKeywordChecker: StringOfObj9,
        altTagLengthChecker: StringOfObj10,
        brokenLinkChecker: JSON.stringify(obj11)
    };
    return FinalObj;
}

const greenColor = (cell) => {
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ff8efa8e' } // Green Colour 
    };
};

const redColor = (cell) => {
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'fffa6969' } // Red color  
    };
};

async function createCSV(urlsAndKeywords) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    worksheet.columns = [
        { header: 'URL', key: 'url', width: 20 },
        { header: 'Keyword', key: 'keyword', width: 20 },
        { header: 'Protocol', key: 'protocol', width: 20 },
        { header: 'Time To First Byte (in ms)', key: 'timeToFirstByte', width: 20 },
        { header: 'First Input Delay (in ms)', key: 'firstInputDelay', width: 20 },
        { header: 'Interaction To Next Paint (in ms)', key: 'interactionToNextPaint', width: 20 },
        { header: 'First Contentful Paint (in ms)', key: 'firstContentfulPaint', width: 20 },
        { header: 'Largest Contentful Paint (in ms)', key: 'largestContentfulPaint', width: 20 },
        { header: 'Frequency of Keyword', key: 'frequency', width: 20 },
        { header: 'Density of keyword', key: 'density', width: 20 },
        { header: 'Is keyword present in h1', key: 'isKeywordFoundinh1', width: 20 },
        { header: 'H1 tag', key: 'h1', width: 30 },
        { header: 'Length of h1 tag', key: 'h1length', width: 20 },
        { header: 'Is Keyword Found In Meta Description', key: 'isKeywordFoundinMetaDescription', width: 30 },
        { header: 'MetaDescription', key: 'MetaDescription', width: 50 },
        { header: 'MetaDescriptionLength', key: 'metaDescriptionLength', width: 30 },
        { header: 'HtmlLength', key: 'htmlLength', width: 20 },
        { header: 'TextLength', key: 'textLength', width: 20 },
        { header: 'Text to HTML Ratio', key: 'ratio', width: 20 },
        { header: 'Is Keyword Found in Url', key: 'isKeywordFoundinUrl', width: 20 },
        { header: 'Is Keyword Found in Title', key: 'isKeywordFoundinTitle', width: 20 },
        { header: 'MetaTitle', key: 'MetaTitle', width: 30 },
        { header: 'Meta Title Length', key: 'metaTitleLength', width: 20 },
        { header: 'Keyword/Alt Tag Mismatch', key: 'altTagKeywordChecker', width: 20 },
        { header: 'Alt Tag Length Checker', key: 'altTagLengthChecker', width: 20 },
        { header: 'Broken Links', key: 'brokenLinkChecker', width: 20 }
    ];
    for (const { url, keyword } of urlsAndKeywords) {
        let data = await getData(url, keyword);
        worksheet.addRow(data);
    }
    worksheet.properties.defaultRowHeight=20;

    worksheet.eachRow((row, rowNumber) => {
        row.height=20;
        row.eachCell((cell, colNumber) => {
            const key = worksheet.columns[colNumber - 1].key;
            if (key.includes('Keyword') && cell.value === true) {
                greenColor(cell);
            }
            if (key.includes('Keyword') && cell.value === false) {
                redColor(cell);
            }
            if (key == 'metaDescriptionLength') {
                // Assuming 160 appropriate length for meta description
                if (cell.value > 160) {
                    redColor(cell);
                } else if (cell.value <= 160) {
                    greenColor(cell);
                }
            }
            if (key == 'protocol') {
                if (cell.value == 'HTTPS') {
                    greenColor(cell);
                } else if (cell.value == 'HTTP') {
                    redColor(cell);
                }
            }
            if (key == 'timeToFirstByte') {
                // Assuming 800 ms ideal value for time to first byte
                if (cell.value > 800) {
                    redColor(cell);
                } else if (cell.value <= 800) {
                    greenColor(cell);
                }
            }
            if (key == 'firstInputDelay') {
                // Assuming 100 ms as ideal value for first input delay
                if (cell.value > 100) {
                    redColor(cell);
                } else if (cell <= 100) {
                    greenColor(cell);
                }
            }
            if (key == 'interactionToNextPaint') {
                // Assuming 200ms as ideal value for interaction to next paint
                if (cell.value > 200) {
                    redColor(cell);
                } else if (cell.value <= 200) {
                    greenColor(cell);
                }
            }
            if (key == 'firstContentfulPaint') {
                //Assuming 1800 ms as ideal value
                if (cell.value > 1800) {
                    redColor(cell);
                } else if (cell.value <= 1800) {
                    greenColor(cell);
                }
            }
            if (key == 'largestContentfulPaint') {
                // Assuming 2500 ms as ideal value
                if (cell.value > 2500) {
                    redColor(cell);
                } else if (cell.value <= 2500) {
                    greenColor(cell);
                }
            }
            if (key == 'frequency') {
                // Assuming below 200 good
                if (cell.value > 200) {
                    redColor(cell);
                } else if (cell.value <= 200) {
                    greenColor(cell);
                }
            }
            if (key == 'density') {
                // Assuming 2% good
                if (cell.value > 2) {
                    redColor(cell);
                } else if (cell.value <= 2) {
                    greenColor(cell);
                }
            }
            if (key == 'h1length') {
                // Assuming 60 good for heading tag
                if (cell.value > 60) {
                    redColor(cell);
                } else if (cell.value <= 60) {
                    greenColor(cell);
                }
            }
            if (key == 'ratio') {
                // Atleast 25% text to html is considered as good
                if (cell.value < 25) {
                    redColor(cell);
                } else if (cell.value >= 25) {
                    greenColor(cell);
                }
            }
            if (key == 'metaTitleLength') {
                //Assuming between 50-60 is good
                if (cell.value >= 50 && cell.value <= 60) {
                    greenColor(cell);
                } else if (cell.value < 50 || cell.value > 60) {
                    redColor(cell);
                }
            }
            if (key == 'altTagKeywordChecker') {
                if (cell.row > 1) { // This condition skips the first row (header row)
                    if (cell.value != '[]') {
                        redColor(cell);
                    } else {
                        greenColor(cell);
                    }
                }
            }
            if (key == 'altTagLengthChecker') {
                if (cell.row > 1) { // This condition skips the first row (header row)
                    if (cell.value != '[]') {
                        redColor(cell);
                    } else {
                        greenColor(cell);
                    }
                }
            }
            if (key == 'brokenLinkChecker') {
                if (cell.row > 1) { // This condition skips the first row (header row)
                    if (cell.value != '[]') {
                        redColor(cell);
                    } else {
                        greenColor(cell);
                    }
                }
            }
        });
    });

    // Write to file
    workbook.xlsx.writeFile('output.xlsx')
        .then(() => {
            console.log('Excel file was written successfully');
        })
        .catch((error) => {
            console.log('Error writing Excel file:', error);
        });
}

// Read the CSV file and generate the Excel file

async function CSVOutput(path){
    readCSV(path)
    .then((urlsAndKeywords) => {
        createCSV(urlsAndKeywords);
    })
    .catch((error) => {
        console.error('Error reading CSV file:', error);
    });
}
module.exports= CSVOutput;