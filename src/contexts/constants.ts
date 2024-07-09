import { PublicKey } from "@solana/web3.js";

/** GLOBAL CONSTANT */
export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
export const network = 'devnet';

export const DUST_VAULT_SEED = "DUST_VAULT_SEED";
export const FORGE_VAULT_SEED = "FORGE_VAULT_SEED";
export const PERCENTAGE_DECIMALS = 3;
export const REWARD_TYPE_NFT = 1;
export const REWARD_TYPE_TOKEN = 0;
export const REWARD_TYPE_SOL = 2;

export const PROGRAM_ID = network === 'devnet' ? new PublicKey("BgNAhuXboSjPugSwmVu43yPXEXguZF7ToNePWuzCTcZe") : new PublicKey("GMLnJXDyuZxDc98xDVgbL6nbSLpk2iW8zLaUCvLavyS8");
export const PYTH_ACCOUNT = network === 'devnet' ? new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix") : new PublicKey("B4vR6BW4WpLh1mFs6LL6iqL4nydbmE5Uzaz2LLsoAXqk");
export const USDC_TOKEN_MINT = network === 'devnet' ? new PublicKey("8UhpQu6xz5zJhkzZrUZFup4TThcyT8Zq8WjsXuW7zbeQ") : new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
export const FRONK_MINT = network === 'devnet' ? new PublicKey("EBjBZHvnhCyQXFQJrjcu66PqBbhh6bHhjA5z7Cjyb5oD"): new PublicKey("5yxNbU8DgYJZNi3mPD9rs4XLh9ckXrhPjJ5VCujUWg5H");
export const FRONK_DECIMAL = network === 'devnet' ? 1000000000 : 100000;
export const REWARD_TOKEN_DECIMAL = network === 'devnet' ? 9 : 5;

