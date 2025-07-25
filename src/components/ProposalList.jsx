// import { useEffect, useState } from 'react';
import { ProposalCard } from './ProposalCard';

export function ProposalList({ proposals, onCardClick }) {
  //   const [proposals, setProposals] = useState([]);

  const proposalsList = proposals.proposals || [];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 ">
      {proposalsList.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          onClick={onCardClick}
          proposal={proposal}
        />
      ))}
    </div>
  );
}
