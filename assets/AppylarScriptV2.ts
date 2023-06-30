import { _decorator, WebView, UITransform, view, v2 } from 'cc';



export class AppylarScriptV2 {
    // Create instances for the ad nodes.
    public interstitialAdNode: any = null;
    public hideInterstitialBtn: any = null;
    // Reference for the main node.
    public node: any = null;
    public canvas: any = null;

    constructor(node: any) {
        this.node = node;
        this.interstitialAdNode = node
            .getChildByName("Interstitial");
        this.canvas = node;
        console.log(node);

        // eventlistner for the closing functionality of Interstitial ad.
        this.node.on('InterstitialClosed', () => {
            console.log('Button clicked in WebView!');
            this.hideInterstitial();
        }, this);

        // capture the event for close Interstitial.
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'close') {
                console.log("Button Clicked.");
                // Trigger a custom event in Cocos Creator
                this.node.emit('InterstitialClosed');
            }
        });

    }

    closeInit = () => {
        const hideInterstitialBtn = this.hideInterstitialBtn;
        if (hideInterstitialBtn) {
            this.hideInterstitialBtn.active = false;
        }
        this.node.emit('InterstitialClosed');
    }

    showInterstitial = async () => {
        this.hideInterstitial();
        try {
            let interstitialWebView = this.interstitialAdNode.addComponent(WebView);
            interstitialWebView.node.on(WebView.EventType.LOADED, this.onWebViewLoaded, this);
            const parent = this.interstitialAdNode.parent;
            interstitialWebView.url = "https://rohit-5ex.github.io/cocos-page/testpage.html";

            const uiTransform = interstitialWebView.getComponent(UITransform);
            const detectedDensity = view.getDevicePixelRatio();
            const windowSize = view.getVisibleSize();
            const screenHeight = windowSize.height / detectedDensity;
            const screenWidth = windowSize.width / detectedDensity;
            this.interstitialAdNode.setAnchorPoint(v2(0.5, 0.5));
            uiTransform.setContentSize(screenWidth, screenHeight);
            return true;
        } catch (error) {
            return false;
        }
    }

    onWebViewLoaded(event) {
        console.log('webView Loaded.', event);
    }

    hideInterstitial = () => {
        const webviewNodeInterstitial = this.interstitialAdNode;
        const interstitialWebViews = webviewNodeInterstitial.getComponents(WebView);
        interstitialWebViews.forEach((webView) => {
            webView.destroy();
        });
        this.hideInterstitialBtn.active = false;
    }

}