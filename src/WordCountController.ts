// Import the module and reference it with the alias vscode in your code below
import { window, StatusBarItem, StatusBarAlignment, Disposable } from 'vscode';

/**
 * The controller of word count
 */
export class WordCountController {
    private _statusBarItem: StatusBarItem;
    private _disposable: Disposable;
    private _delayUpdateTimer: any;
    private _isActive: boolean;

    constructor(isActive: boolean = true) {
        this._isActive = isActive;
        this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    public update(force: boolean = false) {
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
    
        let doc = editor.document;
        let charCount: number | undefined = 0;
        let charCountWithNoSpace: number | undefined = 0;
        let genkouyoushiCount: number | undefined = 0;
    
        if (force || this._isActive) {
            // Update word count.
            if (editor.selection.isEmpty) {
                charCount = this.count();
                charCountWithNoSpace = this.count(false);
                genkouyoushiCount = this.genkouyoushiCount();
                
            } else {
                charCount = this.count();
                charCountWithNoSpace = this.count(false);
                genkouyoushiCount = this.genkouyoushiCount();
            }
    
            // Update the status bar
            try {
                this._statusBarItem.text = `文字数: ${charCount}`;
                this._statusBarItem.tooltip = `文字数: ${charCount}\n文字数(スペース無視): ${charCountWithNoSpace}\n原稿用紙換算(400x?枚): ${genkouyoushiCount}`;
                this._statusBarItem.show();
            } catch (e) {
                window.showErrorMessage('Something is wrong when update status bar');
            }
        } else {
            this._statusBarItem.hide();
        }
    }
    
    private count(isWithSpace: boolean = true): number | undefined {
        
        let editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
    
        let doc = editor.document;
        let count = 0;
        let text = '';
    
        if (editor.selection.isEmpty) {
            text = doc.getText();
        } else {
            text = editor.document.getText(editor.selection);
        }
        
        if (isWithSpace) {
            text = text.replace(/\n|\r/g, '');
        } else {
            text = text.replace(/\n|\r|\s/g, '');
        }
        count = this.countGrapheme(text);
    
        return count;
    }
    
    private genkouyoushiCount(): number | undefined {
        let editor = window.activeTextEditor;
        if (!editor) {
            return;
        }

        let doc = editor.document;
        let lineCount = 0;
        let text = '';

        if (editor.selection.isEmpty) {
            text = doc.getText();
        } else {
            text = editor.document.getText(editor.selection);
        }

        text.split(/\n/).forEach((line) => {
            const lineWithoutR = line.replace(/\r/g, '');
            lineCount += Math.ceil(this.countGrapheme(lineWithoutR) / 20);
        });

        return Math.ceil(lineCount / 20);
    }

    private countGrapheme(string: string) {
        // reference: https://qiita.com/suin/items/3da4fb016728c024eaca
        const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
        return [...segmenter.segment(string)].length;
    }

    private _onEvent() {
        this.update();

        if (this._delayUpdateTimer) {
            clearTimeout(this._delayUpdateTimer);
        }

        this._delayUpdateTimer = setTimeout(() => {
            this._delayUpdateTimer = null;
            this.update();
        }, 500);
    }

    /**
     * This makes the class disposable.
     */
    dispose() {
        this._statusBarItem.dispose();
        this._disposable.dispose();
    }

    activate() {
        this._isActive = true;
        this.update();
    }

    deactivate() {
        this._isActive = false;
        this._statusBarItem.hide();
    }
}