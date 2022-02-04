## WETH Unwrap and Transfer

In general, most CEXs only accepts plain ETH and users have to unwrap WETH first in order to transfer to CEXs.

This contract supports doing it in one transaction, however, the gas is 10k higher than doing it in two transactions due to additional operations.