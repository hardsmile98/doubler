import { Address, toNano } from '@ton/core';
import { Skip } from '../wrappers/Skip';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const skip = provider.open(Skip.createFromConfig(await compile('Skip')));

    await skip.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(skip.address);
}
