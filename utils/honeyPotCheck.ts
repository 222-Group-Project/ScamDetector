import axios from 'axios';
import { base } from 'viem/chains';
import { HONEYPOT_API_URL } from './constants.ts';




const checkHoneypot = async (tokenAddress: string): Promise<object> => {
    try {

        const response = await axios.get(HONEYPOT_API_URL, {
            params: {
                address: tokenAddress,
                chainID: base.id,
                forceSimulateLiquidity: true
            },
        });

        const data = response.data;
        const isHoneypot = data.honeypotResult.isHoneypot;
        const riskLevel = data.summary.riskLevel;


        // let status;
        // if (isHoneypot) {
        //   status = `Token ${tokenAddress} is a honeypot.`;
        // } else if (riskLevel > 50) {
        //   status = `Token ${tokenAddress} has a high risk level of ${riskLevel}.`;
        // } else {
        //   status = `Token ${tokenAddress} is safe.`;
        // }

        return {
            tokenAddress,
            isHoneypot,
            riskLevel,
            //   status
        };
    } catch (error) {
        console.error(`Error checking token ${tokenAddress}:`, error);
        return {
            tokenAddress,
            isHoneypot: null,
            riskLevel: null,
            status: `Error checking token ${tokenAddress}: ${error}`
        };
    }
}

const tokenAddress = '0xfB5D7540FAF21A3A0DB0Da41fD2fE923F93c74eA'; //Replace with actual tokenAddress

checkHoneypot(tokenAddress);

