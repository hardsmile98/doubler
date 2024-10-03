import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Doubler } from '../wrappers/Doubler';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Doubler', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Doubler');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let doubler: SandboxContract<Doubler>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        doubler = blockchain.openContract(Doubler.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await doubler.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: doubler.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and doubler are ready to use
    });
});
