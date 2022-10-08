export class GridGenerator
{
    static generator(params)
    {
        let head = document.getElementsByTagName('head')[0];
        let style = document.createElement('style');
        style.id = "tracteur-webfront-style";
        head.appendChild(style);

        let styleResponsive = "";
        let classes = "";

        classes +=
        `
            .grid {
                display: grid;
                grid-template-columns: repeat(${params["col-quantity"]}, auto);
            }
        `;

        classes +=
        `
            .new-row {
                display: grid
                grid-column-start: 1;
                grid-column-end: ${params["col-quantity"]+1};
            }
        `;

        for (let className in params["screen-size"]) {
            if (params["screen-size"][className][0] != -1 && params["screen-size"][className][1] != -1) {
                styleResponsive += `@media screen and (min-width: ${params["screen-size"][className][0]}px) and (max-width: ${params["screen-size"][className][1]}px) {`;
            }
            else if (params["screen-size"][className][0] == -1 && params["screen-size"][className][1] != -1) {
                styleResponsive += `@media screen and (max-width: ${params["screen-size"][className][1]}px) {`;
            }
            else if (params["screen-size"][className][1] == -1 && params["screen-size"][className][0] != -1) {
                styleResponsive += `@media screen and (min-width: ${params["screen-size"][className][0]}px) {`;
            }

            if (params["screen-size"][className][0] != -1 || params["screen-size"][className][1] != -1) {
                for (let nbCol=0;nbCol<=params["col-quantity"];nbCol++) {
                    styleResponsive +=
                    `
                        .${className} {
                            display: block;
                        }
                    `;

                    classes +=
                    `
                        .${className} {
                            display: none;
                        }
                    `;

                    styleResponsive +=
                    `
                        .${className}-${nbCol} {
                            display: block;
                        }
                    `;

                    classes +=
                    `
                        .${className}-${nbCol} {
                            grid-column: ${nbCol};
                            display: none;
                        }
                    `;

                    styleResponsive +=
                    `
                        .begin-${className}-${nbCol} {
                            display: block;
                        }
                    `;

                    classes +=
                    `
                        .begin-${className}-${nbCol} {
                            grid-column-start: ${nbCol};
                            display: none;
                        }
                    `;

                    styleResponsive +=
                    `
                        .end-${className}-${nbCol} {
                            display: block;
                        }
                    `;

                    classes +=
                    `
                        .end-${className}-${nbCol} {
                            grid-column-end: ${nbCol+1};
                            display: none;
                        }
                    `;
                }

                styleResponsive += '} ';
            }
        }

        style.innerHTML = classes + styleResponsive;
    }
}