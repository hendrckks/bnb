import { useEffect, useState } from "react";
import ListingCard from "../../components/Listings/ListingCard";

const ListingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="mb-5">
        35 results in <span className="font-medium">Nakuru </span>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <ListingCard
          imageUrl="featured1.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="featured2.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss4.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss5.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="background.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="featured1.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="featured2.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss4.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss5.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="background.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="featured1.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="featured2.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss4.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="swiss5.avif"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
        <ListingCard
          imageUrl="background.jpg"
          title="Tiny home in Nakuru"
          description="About of love-br House-Secure parking- Naka A queen bed"
          price={2230}
          dates="Nov 1 - 6"
          location="Nakuru"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ListingsPage;
