import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRating = ({ rating, handleRatingChange, mode }) => {
  return [1, 2, 3, 4, 5].map((star) => {
    if (mode === 'comment') {
      return (
        <StarIcon
          key={star}
          className={`w-6 h-6 ${star <= rating ? 'text-indigo-500 fill-indigo-500' : 'fill-black'}`}
        />
      );
    } else {
      return (
        <Button
          key={star}
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? 'text-indigo-500 hover:bg-indigo-100'
              : 'text-black hover:bg-primary hover:text-primary-foreground'
          }`}
          variant="outline"
          size="icon"
          onClick={() => handleRatingChange && handleRatingChange(star)}
        >
          <StarIcon
            className={`w-6 h-6 ${star <= rating ? 'fill-indigo-500' : 'fill-black'}`}
          />
        </Button>
      );
    }
  });
};

export default StarRating;
