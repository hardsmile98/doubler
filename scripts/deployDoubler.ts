import { Address, toNano } from '@ton/core';
import { Doubler } from '../wrappers/Doubler';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const doubler = provider.open(Doubler.createFromConfig({}, await compile('Doubler')));

    await doubler.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(doubler.address);

    // run methods on `doubler`
}
