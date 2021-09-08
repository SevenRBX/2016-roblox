import { useState } from "react";
import { createContainer } from "unstated-next";
import { purchaseItem } from "../../../services/economy";
import PurchaseError from "../purchaseError";

const CatalogDetailsPageModal = createContainer(() => {
  const [purchaseState, setPurchaseState] = useState('PURCHASE');
  const [isPurchasePromptOpen, setIsPurchasePromptOpen] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  const [isPurchasing, setIsPurchasing] = useState(false);

  return {
    isPurchasePromptOpen,

    purchaseDetails,

    purchaseState,
    setPurchaseState,

    openPurchaseModal: (details, currentBalanceRobux, currentBalanceTix) => {
      if (isPurchasing) return;
      setIsPurchasePromptOpen(true);
      setPurchaseDetails(details);
      const newBalance = currentBalanceRobux - details.price;
      if (newBalance < 0) {
        setPurchaseState('INSUFFICIENT_FUNDS');
      } else {
        setPurchaseState('PURCHASE');
      }
    },
    closePurchaseModal: () => {
      if (isPurchasing) return;
      setIsPurchasePromptOpen(false);
    },

    /**
     * Complete the purchase of the selected product
     */
    purchaseItem: async () => {
      setIsPurchasing(true);
      try {
        let result = await purchaseItem({
          assetId: purchaseDetails.assetId,
          productId: purchaseDetails.productId,
          sellerId: purchaseDetails.sellerId,
          userAssetId: purchaseDetails.userAssetId,
          price: purchaseDetails.price,
          expectedCurrency: purchaseDetails.currency,
        });
        const success = result.purchased;
        if (!success) {
          const error = new PurchaseError('PURCHASE_ERROR');
          const errorReason = result.reason;
          if (errorReason === 'InsufficientFunds') {
            error.state = 'INSUFFICIENT_FUNDS';
          }
          throw error;
        }
        return result;
      } finally {
        setIsPurchasing(false);
      }
    },

  }
});

export default CatalogDetailsPageModal;