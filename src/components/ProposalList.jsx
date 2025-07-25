// import { useEffect, useState } from 'react';
import { ExchangeProposalCard } from '../components/ProposalCard';

export function ProposalList({ proposals, onCardClick }) {
  //   const [proposals, setProposals] = useState([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ">
      {proposals.map((proposal) => (
        <ExchangeProposalCard
          key={proposal.id}
          proposal={proposal}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
