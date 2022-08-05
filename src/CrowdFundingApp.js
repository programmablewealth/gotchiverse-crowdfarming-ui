import { Component } from 'react';
import { ethers } from "ethers";

const crowdFundingABI = require("./abis/CrowdFundingFacet.json");
const realmDiamondABI = require("./abis/realm-diamond.json");

class CrowdFundingApp extends Component {
    async componentDidMount() {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const diamondContract = new ethers.Contract("0x39E25F2988B09F5645022cD01f651231BFa609AE", crowdFundingABI, provider);
        console.log('connected', window.ethereum.selectedAddress);
        console.log('diamondContract', diamondContract);
    }

    async approveLandTransfer() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const realmDiamondContract = new ethers.Contract("0x1D0360BaC7299C86Ec8E99d0c1C9A95FEfaF2a11", realmDiamondABI, provider);
        const realmDiamondContractWithSigner = realmDiamondContract.connect(provider.getSigner());

        let landTokenId = 18765;
        // realmDiamondContractWithSigner.approve("0x1D0360BaC7299C86Ec8E99d0c1C9A95FEfaF2a11", 18765)
        realmDiamondContractWithSigner.approve("0x39E25F2988B09F5645022cD01f651231BFa609AE", 18765)
            .then((result) => {
                console.log('result', result);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    async createOperation() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const diamondContract = new ethers.Contract("0x39E25F2988B09F5645022cD01f651231BFa609AE", crowdFundingABI, provider);
        const diamondContractWithSigner = diamondContract.connect(provider.getSigner());
        
        let landTokenId = 18780;
        let installationIds = [1, 56, 65, 74, 83, 92, 101, 110, 119];
        let installationQuantities = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        let instaBuild = true;
        
        diamondContractWithSigner.createFarmingOperation(landTokenId, installationIds, installationQuantities, instaBuild)
            .then((result) => {
                console.log('result', result);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    render() {
        return(
            <div>
                <p>CrowdFundingApp</p>
                <button onClick={() => this.createOperation()}>Create Operation</button>
                <button onClick={() => this.approveLandTransfer()}>Approve Transfer</button>
            </div>
        )
    }
}

export default CrowdFundingApp;