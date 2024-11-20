import { Address, toNano } from '@ton/core';
import { Doubler } from '../wrappers/Doubler';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const doubler = provider.open(Doubler.createFromConfig({}, await compile('Doubler')));

    await doubler.sendBet(provider.sender(), toNano('0.001'));
}
