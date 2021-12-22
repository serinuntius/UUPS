import {expect} from 'chai';
import "@nomiclabs/hardhat-waffle";

import {ethers, upgrades} from "hardhat";
import {Contract, Signer} from "ethers";
import {parseEther} from "ethers/lib/utils";

describe("JPYZ", function () {
    let accounts: Signer[];
    let alice: string;
    let bob: string;

    let jpyz: Contract;
    beforeEach(async () => {
        accounts = await ethers.getSigners();
        alice = await accounts[0].getAddress();
        bob = await accounts[1].getAddress();

        const JPYZ = await ethers.getContractFactory("JPYZ");
        jpyz = await upgrades.deployProxy(JPYZ, []);
    });


    it("should mint.", async function () {
        await jpyz.mint(bob, parseEther('10000'));

        const bobBalance = await jpyz.balanceOf(bob);

        expect(bobBalance).to.be.eq(parseEther('10000'));
    });

    it("upgrade", async () => {
        await jpyz.mint(bob, parseEther('10000'));

        const JPYZ2 = await ethers.getContractFactory("JPYZ2");

        const upgradedJPYZ = await upgrades.upgradeProxy(jpyz.address, JPYZ2);


        const bobBalance = await upgradedJPYZ.balanceOf(bob);
        expect(bobBalance).to.be.eq(parseEther('10000'));

        await upgradedJPYZ.mint(bob, parseEther('10000'));

        const bobBalance2 = await upgradedJPYZ.balanceOf(bob);
        expect(bobBalance2).to.be.eq(parseEther('30000'));


        await upgradedJPYZ.mint2(bob, parseEther('10000'));

        const bobBalance3 = await upgradedJPYZ.balanceOf(bob);
        expect(bobBalance3).to.be.eq(parseEther('70000'));

        const a = await upgradedJPYZ.a();
        const b = await upgradedJPYZ.b();

        expect(a).to.be.eq('100');
        expect(b).to.be.eq('200');
    });

});