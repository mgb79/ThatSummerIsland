//=============================================================================
// LB_Font.js
//=============================================================================

/**
 * Copyright (c) 2021 lunabunn
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

/*:
 * @plugindesc A dead-simple font changer plugin.
 * @author Lunabunn
 *
 * @help Add any custom fonts you want to use to the font faces list and then
 * set the font options below to see them in-game with no additional setup.
 * 
 * @param fontFaces
 * @text Font Faces
 * @desc The list of font faces to use.
 * @type struct<FontFace>[]
 * 
 * @param chineseFonts
 * @text Chinese Font Faces
 * @desc The list of font faces to use for Chinese (comma-separated, highest to lowest priority).
 * @type text
 * @default SimHei, Heiti TC, sans-serif
 * 
 * @param koreanFonts
 * @text Korean Font Faces
 * @desc The list of font faces to use for Korean (comma-separated, highest to lowest priority).
 * @type text
 * @default Dotum, AppleGothic, sans-serif
 * 
 * @param defaultFonts
 * @text Default Font Faces
 * @desc The list of font faces to use (comma-separated, highest to lowest priority).
 * @type text
 * @default GameFont
 * 
 * @param defaultFontSize
 * @text Default Font Size
 * @desc The default font size to use.
 * @type number
 * @default 28
 * 
 * @param lineHeight
 * @text Line Height
 * @desc The line height to use.
 * @type number
 * @default 36
 * 
 * @param textPadding
 * @text Text Padding
 * @desc The text padding to use.
 * @type number
 * @default 6
 */

/*:ko
 * @plugindesc 간단??글�?변�??�러그인?�니??
 *
 * @help 글�?목록???�용?�시�??��? 글꼴들??추�??�신 ???�단??
 * 글�??�션??변경함?�로??추�? ?�정 ?�이 게임?�서 ?�용??가?�합?�다.
 * 
 * @param fontFaces
 * @text 글�?
 * @desc ?�용??글�?목록
 * @type struct<FontFace>[]
 * 
 * @param chineseFonts
 * @text 중국??글�?
 * @desc 중국?��? ?�시?�기 ?�해 ?�용??글꼴들 (콤마�?구분, ?�선?�위 ?�림차순 ?�렬)
 * @type text
 * @default SimHei, Heiti TC, sans-serif
 * 
 * @param koreanFonts
 * @text ?�국??글�?
 * @desc ?�국?��? ?�시?�기 ?�해 ?�용??글꼴들 (콤마�?구분, ?�선?�위 ?�림차순 ?�렬)
 * @type text
 * @default Dotum, AppleGothic, sans-serif
 * 
 * @param defaultFonts
 * @text 기본 글�?
 * @desc 기본 글꼴들 (콤마�?구분, ?�선?�위 ?�림차순 ?�렬)
 * @type text
 * @default GameFont
 * 
 * @param defaultFontSize
 * @text 기본 글???�기
 * @desc 기본 글???�기
 * @type number
 * @default 28
 * 
 * @param lineHeight
 * @text �?간격
 * @desc �?간격
 * @type number
 * @default 36
 * 
 * @param textPadding
 * @text 글???�딩
 * @desc 글???�딩
 * @type number
 * @default 6
 */

/*~struct~FontFace:ko
 * @param name
 * @text 글�??�름
 * @desc 글꼴의 ?�름
 * @type text
 *
 * @param file
 * @text 글�??�일
 * @desc 글꼴의 ?�일 경로 (fonts/ 기�?).
 * @type text
 */

{
    const fontFaces = JSON.parse(PluginManager.parameters("LB_Font")["fontFaces"] || "[]");
    const chineseFonts = PluginManager.parameters("LB_Font")["chineseFonts"];
    const koreanFonts = PluginManager.parameters("LB_Font")["koreanFonts"];
    const defaultFonts = PluginManager.parameters("LB_Font")["defaultFonts"];
    const defaultFontSize = parseInt(PluginManager.parameters("LB_Font")["defaultFontSize"]);
    const lineHeight = parseInt(PluginManager.parameters("LB_Font")["lineHeight"]);
    const textPadding = parseInt(PluginManager.parameters("LB_Font")["textPadding"]);

    let style = document.createElement("style");
    for (e of fontFaces) {
        const fontFace = JSON.parse(e);
        style.innerHTML += `@font-face {
            font-family: ${fontFace.name};
            src: url("PixelMplus10-Regular.ttf");
        }`;
    }
    document.head.appendChild(style);

    Window_Base.prototype.standardFontFace = function () {
        if ($gameSystem.isChinese()) {
            return chineseFonts;
        } else if ($gameSystem.isKorean()) {
            return koreanFonts;
        } else {
            return defaultFonts;
        }
    };

    Window_Base.prototype.standardFontSize = function () {
        return defaultFontSize;
    };

    Window_Base.prototype.lineHeight = function () {
        return lineHeight;
    };

    Window_Base.prototype.textPadding = function () {
        return textPadding;
    };
}