//=============================================================================
// RPG Maker MZ - Extra Window Display Per Scene Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Extra Window Display Per Scene Plugin 
 * @author triacontane
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param WindowList
 * @text Window List
 * @desc A list of windows to be added to all screens.
 * @default []
 * @type struct<Window>[]
 *
 * @help ExtraWindow.js
 *
 * Additional window displays can be used for scenes that have an optional window specified.
 * Basic information such as coordinates, font size, whether there's an open/close animation, etc. can be set.
 * Control characters can be used in the window display text, and when the return value is changed,
 * it will automatically be redrawn.
 *
 */

/*~struct~Window:
 *
 * @param SceneName
 * @text Target Scene
 * @desc The scene to receive the extra window. When targeting an original scene, directly input the scene class name.
 * @type select
 * @default Scene_Title
 * @option Title
 * @value Scene_Title
 * @option Map
 * @value Scene_Map
 * @option Game Over
 * @value Scene_Gameover
 * @option Battle
 * @value Scene_Battle
 * @option Main Menu
 * @value Scene_Menu
 * @option Items
 * @value Scene_Item
 * @option Skills
 * @value Scene_Skill
 * @option Equipment
 * @value Scene_Equip
 * @option Status
 * @value Scene_Status
 * @option Options
 * @value Scene_Options
 * @option Save
 * @value Scene_Save
 * @option Load
 * @value Scene_Load
 * @option Game End
 * @value Scene_End
 * @option Shop
 * @value Scene_Shop
 * @option Name Input
 * @value Scene_Name
 * @option Debug
 * @value Scene_Debug
 *
 * @param x
 * @text X coordinate
 * @desc The X coordinate.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param y
 * @text Y coordinate
 * @desc The Y coordinate.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param width
 * @text Width
 * @desc The width.
 * @default 200
 * @type number
 *
 * @param height
 * @text Height.
 * @desc The height. Configured automatically when 0 is specified.
 * @default 0
 * @type number
 *
 * @param LineHeight
 * @text Line Height
 * @desc Height per line.
 * @default 36
 * @type number
 *
 * @param Text
 * @text Displayed Text
 * @desc Content to be displayed in the window. If a return value that serves as the basis for a control character is changed, it will automatically be redrawn.
 * @default
 * @type multiline_string
 *
 * @param FontSize
 * @text Font Size
 * @desc The default font size. Becomes the same size as other windows when 0 is specified.
 * @default 0
 * @type number
 *
 * @param WindowSkin
 * @text Window Skin
 * @desc The window skin. If not specified, the default will be used.
 * @default
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param SwitchId
 * @text Display SwitchID
 * @desc Will be displayed on screen only when the specified switch is ON.
 * @default 0
 * @type switch
 *
 * @param ShowOpenAnimation
 * @text Open/Close Animation Display
 * @desc Displays a window open/close animation.
 * @default true
 * @type boolean
 */
/*:ja
 * @target MZ
 * @plugindesc 各シーンに追加で任意のウィンドウを表示します。
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param WindowList
 * @text ウィンドウリスト
 * @desc 各画面に追加するウィンドウのリストです。
 * @default []
 * @type struct<Window>[]
 *
 * @help ExtraWindow.js
 *
 * 任意のウィンドウを指定したシーンに追加表示できます。
 * 座標やフォントサイズ、開閉アニメの有無など基本的な情報を設定できます。
 * ウィンドウの表示テキストには制御文字が使用でき、変数値が変更されると
 * 自動的に再描画されます。
 *
 */

/*~struct~Window:ja
 *
 * @param SceneName
 * @text 対象シーン
 * @desc 追加対象のシーンです。オリジナルのシーンを対象にする場合はシーンクラス名を直接記入します。
 * @type select
 * @default Scene_Title
 * @option タイトル
 * @value Scene_Title
 * @option マップ
 * @value Scene_Map
 * @option ゲームオーバー
 * @value Scene_Gameover
 * @option バトル
 * @value Scene_Battle
 * @option メインメニュー
 * @value Scene_Menu
 * @option アイテム
 * @value Scene_Item
 * @option スキル
 * @value Scene_Skill
 * @option 装備
 * @value Scene_Equip
 * @option ステータス
 * @value Scene_Status
 * @option オプション
 * @value Scene_Options
 * @option セーブ
 * @value Scene_Save
 * @option ロード
 * @value Scene_Load
 * @option ゲーム終了
 * @value Scene_End
 * @option ショップ
 * @value Scene_Shop
 * @option 名前入力
 * @value Scene_Name
 * @option デバッグ
 * @value Scene_Debug
 *
 * @param x
 * @text X座標
 * @desc X座標です。
 * @default 0
 * @type number
 * @min -9999
 *
 * @param y
 * @text Y座標
 * @desc Y座標です。
 * @default 0
 * @type number
 * @min -9999
 *
 * @param width
 * @text 横幅
 * @desc 横幅です。
 * @default 200
 * @type number
 *
 * @param height
 * @text 高さ
 * @desc 高さです。0を指定した場合、自動設定されます。
 * @default 0
 * @type number
 *
 * @param LineHeight
 * @text 行の高さ
 * @desc 1行あたりの高さです。
 * @default 36
 * @type number
 *
 * @param Text
 * @text 表示テキスト
 * @desc ウィンドウに表示される内容です。制御文字のもとになる変数が変更された場合、自動で再描画されます。
 * @default
 * @type multiline_string
 *
 * @param FontSize
 * @text フォントサイズ
 * @desc デフォルトのフォントサイズです。0を指定すると他のウィンドウと同じサイズになります。
 * @default 0
 * @type number
 *
 * @param WindowSkin
 * @text ウィンドウスキン
 * @desc ウィンドウスキンです。指定しなかった場合、デフォルトが使用されます。
 * @default
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param SwitchId
 * @text 表示スイッチID
 * @desc 指定したスイッチがONの場合のみ画面に表示されます。
 * @default 0
 * @type switch
 *
 * @param ShowOpenAnimation
 * @text 開閉アニメ表示
 * @desc ウィンドウの開閉アニメーションを表示します。
 * @default true
 * @type boolean
 */

/*:ko
 * @target MZ
 * @plugindesc 각 씬(장면)에 추가로 임의의 윈도우(창)을 표시합니다.
 * @author 토리아콘탄
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param WindowList
 * @text 윈도우(창) 리스트
 * @desc 각 장면에 추가할 윈도우(창)의 리스트 입니다.
 * @default []
 * @type struct<Window>[]
 *
 * @help ExtraWindow.js
 *
 * 임의의 윈도우를 지정하여 씬(장면)에 추가표시 할 수 있습니다.
 * 창의 좌표나 사이즈, 개폐 애니메이션의 유무 등 기본 정보를 설정할 수 있습니다.
 * 창의 표시 텍스트의 제어문자를 사용할 수 있어 변수값이 변경되면
 * 자동적으로 다시 그려집니다.
 *
 */

/*~struct~Window:ko
 *
 * @param SceneName
 * @text 대상 씬(장면)
 * @desc 추가가 되는 씬(장면)입니다. 오리지널씬을 대상으로 할 경우 씬 씬의 클래스 이름을 직접 입력합니다.
 * @type select
 * @default Scene_Title
 * @option 타이틀
 * @value Scene_Title
 * @option 맵
 * @value Scene_Map
 * @option 게임 오버
 * @value Scene_Gameover
 * @option 배틀
 * @value Scene_Battle
 * @option 메인메뉴
 * @value Scene_Menu
 * @option 아이템
 * @value Scene_Item
 * @option 스킬
 * @value Scene_Skill
 * @option 장비
 * @value Scene_Equip
 * @option 스테이터스
 * @value Scene_Status
 * @option 옵션
 * @value Scene_Options
 * @option 세이브
 * @value Scene_Save
 * @option 로드
 * @value Scene_Load
 * @option 게임 종료
 * @value Scene_End
 * @option 상점(샵)
 * @value Scene_Shop
 * @option 이름 입력
 * @value Scene_Name
 * @option 디버그
 * @value Scene_Debug
 *
 * @param x
 * @text X좌표
 * @desc X좌표입니다.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param y
 * @text Y좌표
 * @desc Y좌표 입니다.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param width
 * @text 폭
 * @desc 윈도우의 폭입니다.
 * @default 200
 * @type number
 *
 * @param height
 * @text 높이
 * @desc 높이 입니다. 0으로 지정될 경우 자동설정됩니다.
 * @default 0
 * @type number
 *
 * @param LineHeight
 * @text 행 높이
 * @desc 1개의 행에 대한 높이입니다.
 * @default 36
 * @type number
 *
 * @param Text
 * @text 표시 텍스트 
 * @desc 창에 표시되는 내용입니다. 제어문자의 원래 변수가 변경될 경우 자동적으로 다시 그려집니다.
 * @default
 * @type multiline_string
 *
 * @param FontSize
 * @text 폰트사이즈
 * @desc 기본 폰트의 크기 입니다. 0을 지정하면 다른 윈도우의 폰트와 동일한 사이즈가 됩니다.
 * @default 0
 * @type number
 *
 * @param WindowSkin
 * @text 윈도우 스킨
 * @desc 윈도우 스킨 입니다. 지정하지 않을 경우 기본 스킨이 사용됩니다.
 * @default
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param SwitchId
 * @text 표시 스위치 ID
 * @desc 지정한 스위치가 On이 될 경우에민 표시되게 하는 ID 입니다.
 * @default 0
 * @type switch
 *
 * @param ShowOpenAnimation
 * @text 개폐 애니메이션 표시
 * @desc 윈도우의 개폐 애니메이션을 표시합니다.
 * @default true
 * @type boolean
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    const _Scene_Base_create = Scene_Base.prototype.create;
    Scene_Base.prototype.create = function () {
        _Scene_Base_create.apply(this, arguments);
        this._extraWindows = this.findExtraWindowList().map(windowData => {
            if (!windowData.height) {
                const lineCount = windowData.Text.split('\n').length;
                windowData.height = lineCount * (windowData.LineHeight || 36) + $gameSystem.windowPadding() * 2;
            }
            return new Window_SceneExtra(windowData);
        });
    };

    const _Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function () {
        _Scene_Base_start.apply(this, arguments);
        this._extraWindows.forEach(extraWindow => {
            if (this._windowLayer) {
                this.addWindow(extraWindow);
            } else {
                this.addChild(extraWindow);
            }
        });
    };

    Scene_Base.prototype.findExtraWindowList = function () {
        const currentSceneName = PluginManagerEx.findClassName(this);
        return (param.WindowList || []).filter(function (data) {
            return data.SceneName === currentSceneName;
        }, this);
    };

    class Window_SceneExtra extends Window_Base {

        constructor(contentsData) {
            super(contentsData);
            if (this.isShowOpen()) {
                this.openness = 0;
            }
            this.refresh();
        }

        isShowOpen() {
            return this._data.ShowOpenAnimation;
        }

        refresh() {
            this.drawAllText();
            if (this._data.WindowSkin) {
                this.windowskin = ImageManager.loadSystem(this._data.WindowSkin);
            }
        }

        lineHeight() {
            return this._data.LineHeight || super.lineHeight();
        }

        resetFontSettings() {
            super.resetFontSettings();
            if (this._data.FontSize) {
                this.contents.fontSize = this._data.FontSize;
            }
        };

        drawAllText() {
            const newText = PluginManagerEx.convertEscapeCharacters(this._data.Text);
            if (this._text !== newText) {
                this._text = newText;
                this.contents.clear();
                this.drawTextEx(newText, 0, 0, this._data.width);
            }
        }

        update() {
            if (this.isValid()) {
                if (this.isShowOpen()) {
                    this.open();
                } else {
                    this.openness = 255;
                }
            } else {
                if (this.isShowOpen()) {
                    this.close();
                } else {
                    this.openness = 0;
                }
            }
            super.update();
            this.drawAllText();
        }

        isValid() {
            return !this._data.SwitchId || $gameSwitches.value(this._data.SwitchId);
        }

        checkRectObject(contentsData) {
            this._data = contentsData;
            super.checkRectObject(contentsData);
        }
    }
    window.Window_SceneExtra = Window_SceneExtra;
})();
