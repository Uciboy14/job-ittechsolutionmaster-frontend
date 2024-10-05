import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for payment processing
  const navigate = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleCryptoChange = (e) => {
    setCryptoAddress(e.target.value);
  };

  const validateCardNumber = (number) => {
    // Basic validation for card number (Luhn check can be added for better validation)
    return /^[0-9]{16}$/.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // Simple validation for card number
    if (paymentMethod === "credit" && !validateCardNumber(cardDetails.cardNumber)) {
      alert("Invalid card number. Please check again.");
      setIsLoading(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      console.log("Payment Method:", paymentMethod);
      if (paymentMethod === "credit") {
        console.log("Card Details:", cardDetails);
      } else {
        console.log("Crypto Address:", cryptoAddress);
      }
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg max-w-4xl">
      <div className="opacity-100 relative z-4 w-full rounded-[4px] min-w-[300px] max-w-[1024px] mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb currentStep="payment" />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Background Check Payment
        </h2>
        <p className="mb-4">Please pay a $50 background check fee.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Payment Method Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Payment Method:</h3>
            <div className="flex items-center">
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === "credit"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="credit" className="mr-4 flex items-center">
                Credit/Debit Card
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" // Visa logo URL
                  alt="Visa"
                  className="ml-2 h-6"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Mastercard_Logo.png" // Mastercard logo URL
                  alt="Mastercard"
                  className="ml-2 h-6"
                />
              </label>
              <input
                type="radio"
                id="crypto"
                name="paymentMethod"
                value="crypto"
                checked={paymentMethod === "crypto"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="crypto" className="flex items-center">
                Cryptocurrency
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Bitcoin_logo.svg" // Bitcoin logo URL
                  alt="Bitcoin"
                  className="ml-2 h-6"
                />
              </label>
            </div>
          </div>

          {/* Credit/Debit Card Form */}
          {paymentMethod === "credit" && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Card Details</h3>
              <div>
                <label className="block text-gray-700 font-medium">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                  required
                  maxLength="16"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 font-medium">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 font-medium">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                  required
                  maxLength="3"
                  placeholder="123"
                />
              </div>
            </div>
          )}

          {/* Cryptocurrency Form */}
          {paymentMethod === "crypto" && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Cryptocurrency Payment</h3>
              <label className="block text-gray-700 font-medium">Wallet Address</label>
              <input
                type="text"
                value={cryptoAddress}
                onChange={handleCryptoChange}
                className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your wallet address"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200 ${isLoading ? "cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay $50"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
