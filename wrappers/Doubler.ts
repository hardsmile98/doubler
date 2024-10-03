import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type DoublerConfig = {
    owner: Address
};

export function doublerConfigToCell(config: DoublerConfig): Cell {
    return beginCell().storeAddress(config.owner).endCell();
}

export class Doubler implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Doubler(address);
    }

    static createFromConfig(config: DoublerConfig, code: Cell, workchain = 0) {
        const data = doublerConfigToCell(config);
        const init = { code, data };
        return new Doubler(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getAddresses(provider: ContractProvider) {
        const result = (await provider.get('get_addresses', [])).stack;
        const owner = result.readAddress();
        const contract = result.readAddress();

        return {
            owner,
            contract,
        }
    }

    async sendBet(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1001, 32).endCell(),
        });
    }
}
