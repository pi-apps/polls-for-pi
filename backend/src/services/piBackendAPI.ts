import PiNetwork from 'pi-backend';
import env from "../environments";

// DO NOT expose these values to public
const apiKey = env.pi_api_key;
const walletPrivateSeed = env.wallet_private_seed;
const walletPublicKey = env.wallet_public_key;
const piBackendAPI = new PiNetwork(apiKey, walletPrivateSeed);

export default piBackendAPI;