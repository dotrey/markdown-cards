import { CardSide } from "../model/CardSide";

export class CardSideBuilder {
    private _hasContent: boolean = false;
    hasContent() {
        return this._hasContent;
    }

    private title: string = "";
    setTitle(value: string) {
        this.title = value;
        this._hasContent = true;
        return this;
    }
    appendTitle(value: string) {
        if (this.title) {
            this.title += "\n";
        }
        this.title += value;
        this._hasContent = true;
        return this;
    }

    private body: string = "";
    setBody(value: string) {
        this.body = value;
        this._hasContent = true;
        return this;
    }
    appendBody(value: string) {
        if (this.body) {
            this.body += "\n";
        }
        this.body += value;
        this._hasContent = true;
        return this;
    }

    build() {
        // TODO: conversions
        let titleText: string = this.title;
        let bodyText: string = this.body;
        let titleHtml: string = this.title;
        let bodyHtml: string = this.body;
        return new CardSide(this.title, titleText, titleHtml, this.body, bodyText, bodyHtml);
    }

    reset() {
        this._hasContent = false;
        this.title = "";
        this.body = "";
    }
}