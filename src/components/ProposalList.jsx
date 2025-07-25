// import { useEffect, useState } from 'react';
import { ExchangeProposalCard } from '../components/ProposalCard';

export function ProposalList({ proposals, onCardClick }) {
  //   const [proposals, setProposals] = useState([]);

  const proposalsList = proposals.proposals || [];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 ">
      {proposalsList.map((proposal) => (
        <ExchangeProposalCard
          key={proposal.id}
          onClick={onCardClick}
          proposal={proposal}
        />
      ))}
    </div>
  );
}
