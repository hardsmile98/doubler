import { Address, toNano } from '@ton/core';
import { Doubler } from '../wrappers/Doubler';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const doubler = provider.open(Doubler.createFromConfig({
        owner: provider.sender().address as Address,
    }, await compile('Doubler')));

    console.log(await doubler.getAddresses());
}