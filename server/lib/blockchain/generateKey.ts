import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import chalk from "chalk";

/**
 * Generates a random Ethereum private key and corresponding account address
 */
export function generateKey() {
    console.log("Generating key...");
  // Generate a random private key
  const privateKey = generatePrivateKey();
  
  // Convert the private key to an account to get the address
  const account = privateKeyToAccount(privateKey);
  
// Log the results with warnings
  console.log(chalk.yellow("\n⚠️  WARNING: Keep your private key secure! ⚠️"));
  console.log(chalk.yellow("Never share it with anyone or commit it to a repository.\n"));
  
  console.log(chalk.green("Generated Ethereum account:"));
  console.log(chalk.cyan("Private Key:"), chalk.red(privateKey));
  console.log(chalk.cyan("Address:    "), chalk.blue(account.address));
  console.log(chalk.yellow("\nStore this information in a secure location.\n"));
}
