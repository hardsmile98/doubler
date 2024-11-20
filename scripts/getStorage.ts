import { Address, toNano } from '@ton/core';
import { Doubler } from '../wrappers/Doubler';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const doubler = provider.open(Doubler.createFromConfig({
        owner: provider.sender().address as Address,
        skipAddress: Address.parse('Ef-osb6v7ABZsw0ZPtBy-cUku6jOghW63dybP0FgImz9l9N7'),
    }, await compile('Doubler')));

    console.log(await doubler.getStorage());
}
