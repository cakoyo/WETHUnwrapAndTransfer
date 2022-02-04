//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./IWETH.sol";

// This is not recommend to use as gas are 10k higher than doing with two transactions.
contract WETHUnwrapper {
    /// @dev WETH9 https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
    IWETH private constant WETH = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    constructor() {}

    /// @notice Unwrap ethers and transfer to the recipient (CEXs for example)
    function unwrapAndTransfer(address payable recipient, uint256 amount) external payable { // payable for gas saving
        WETH.transferFrom(msg.sender, address(this), amount);
        WETH.withdraw(amount);
        recipient.transfer(amount);
    }

    receive() external payable {}
}
