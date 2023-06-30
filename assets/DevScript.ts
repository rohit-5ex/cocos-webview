import {
  _decorator,
  Component,
  Button
} from "cc";

const { ccclass, property } = _decorator;

import { AppylarScriptV2 } from "./AppylarScriptV2";
@ccclass("DevScript")
export class DevScript extends Component {
  public hideInterstitialBtn: any = null;
  public Interstitial: any = null;

  public AppylarScript: AppylarScriptV2 = null;
  sys: any;
  onLoad() {
    this.AppylarScript = new AppylarScriptV2(this.node)
  }


  showInterstitialAd() {
      const response: any = this.AppylarScript.showInterstitial();
  }


  closeInit() {
    this.AppylarScript.closeInit();
  }

  start() {
  }
  update(deltaTime: number) { }
}
