import { trpc } from '../utils/trpc';
import Dropdown from './Dropdown';

export default function Models() {
  const greeting = trpc.greeting.useQuery({ name: 'tRPC user' });
  const models = trpc.openaiListModels.useQuery();
  console.log('models');
  const test = ['first', 'second', 'third'];
  return (
    <div>
      <Dropdown options={test} />
      {greeting.data?.text} {models.data?.text}
    </div>
  );
}
