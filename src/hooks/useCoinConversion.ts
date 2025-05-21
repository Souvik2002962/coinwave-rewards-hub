
import { useState, useMemo } from 'react';

// Define conversion rates
const COIN_TO_INR = 0.010; // 1 coin = ₹0.010
const COIN_TO_USD = 0.012; // 1 coin = $0.012

type CurrencyType = 'INR' | 'USD';

interface ConversionOptions {
  includeSymbol?: boolean;
}

export const useCoinConversion = (initialCoins: number = 0) => {
  const [coins, setCoins] = useState(initialCoins);

  const convertToINR = useMemo(() => {
    return (options: ConversionOptions = {}) => {
      const { includeSymbol = true } = options;
      const value = coins * COIN_TO_INR;
      return includeSymbol ? `₹${value.toFixed(2)}` : value.toFixed(2);
    };
  }, [coins]);

  const convertToUSD = useMemo(() => {
    return (options: ConversionOptions = {}) => {
      const { includeSymbol = true } = options;
      const value = coins * COIN_TO_USD;
      return includeSymbol ? `$${value.toFixed(2)}` : value.toFixed(2);
    };
  }, [coins]);

  const convert = (currency: CurrencyType, options: ConversionOptions = {}) => {
    return currency === 'INR' ? convertToINR(options) : convertToUSD(options);
  };

  return {
    coins,
    setCoins,
    convertToINR,
    convertToUSD,
    convert,
    COIN_TO_INR,
    COIN_TO_USD
  };
};

export default useCoinConversion;
