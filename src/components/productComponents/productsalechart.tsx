import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sale } from '../../../generated/prisma';

export default function Productsalechart({sale}:{sale:sale[]}) {
  const grouped: any = {};

sale.forEach((val) => {
  const date = new Date(Number(val.createdat)).toLocaleDateString();

  if (!grouped[date]) {
    grouped[date] = { name: date, quantity: 0 };
  }

  grouped[date].quantity += val.quantity;
});

const data = Object.values(grouped);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: data?.length}} />
   
      </LineChart>
    </ResponsiveContainer>
  );
}