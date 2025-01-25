// const AmountRegex = /^\d*\.?\d{0,2}$/;
const AmountRegex = /^(?!\.)(\d+(\.\d{0,2})?)?$/;

export default AmountRegex;