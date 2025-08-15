'use client';
import { createsale } from '@/lib/gql/mutation';
import gqlclient from '@/lib/services/gql';
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { sale } from '../../generated/prisma';

function Addtosalebtn({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSale() {
    if (quantity > product.stock) {
      alert('Quantity exceeds available stock.');
      return;
    }

    try {
      setLoading(true);
      const resp:{createsale:sale} = await gqlclient.request(createsale, {
        createsaleId: product.id,
        quantity,
      });

      if (resp?.createsale) {
        alert('Sale added successfully!');
        setQuantity(1);
      } else {
        alert('Failed to add sale.');
      }
    } catch (e) {
      alert('Error adding sale.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      
      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          className="px-3 py-2  disabled:opacity-50"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          className="w-16 text-center border-x outline-none"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
        <button
          className="px-3 py-2 disabled:opacity-50"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          disabled={quantity >= product.stock}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

    
      <button
        onClick={handleSale}
        disabled={loading || quantity > product.stock || product.stock === 0}
        className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="w-4 h-4" />
        {loading ? 'Adding...' : 'Add to Sale'}
      </button>
    </div>
  );
}

export default Addtosalebtn;
