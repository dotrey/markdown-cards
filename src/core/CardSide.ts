export class CardSide {
    private _titleRaw: string = "";
    private _titleText: string = "";
    private _titleHtml: string = "";
    private _bodyRaw: string = "";
    private _bodyText: string = "";
    private _bodyHtml: string = "";

    constructor(titleRaw: string, titleText: string, titleHtml: string, bodyRaw: string, bodyText: string, bodyHtml: string) {
        this._titleRaw = titleRaw;
        this._titleText = titleText;
        this._titleHtml = titleHtml;
        this._bodyRaw = bodyRaw;
        this._bodyText = bodyText;
        this._bodyHtml = bodyHtml;
    }

    /**
     * Returns the title raw, as it is extracted from the markdown file.
     * @returns 
     */
    get titleRaw(): string {
        return this._titleRaw;
    }

    /**
     * Returns the title as text only.
     * @returns 
     */
    get titleText(): string {
        return this._titleText;
    }

    /**
     * Returns the title with markdown converted to HTML tags.
     * @returns 
     */
    get titleHtml(): string {
        return this._titleHtml;
    }

    /**
     * Returns the body raw, as it is extracted from the markdown file.
     * @returns 
     */
    get bodyRaw(): string {
        return this._bodyRaw;
    }

    /**
     * Returns the body as text only.
     * @returns 
     */
    get bodyText(): string {
        return this._bodyText;
    }

    /**
     * Returns the body with markdown converted to HTML tags.
     * @returns 
     */
    get bodyHtml(): string {
        return this._bodyHtml;
    }
}