"use client"

interface PropertyPriceSectionProps {
  price: number
  isRTL: boolean
}

export const PropertyPriceSection = ({ price, isRTL }: PropertyPriceSectionProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isRTL ? "ar-SA" : "en-US").format(price)
  }

  return (
    <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
      <div className="text-3xl font-bold text-green-600">
        {formatPrice(price)} {isRTL ? "ريال سعودي" : "SAR"}
      </div>
    </div>
  )
}
