// import { useEffect, useState } from 'react';
import { ProposalCard } from './ProposalCard';

export function ProposalList({ proposals, onCardClick }) {
  //   const [proposals, setProposals] = useState([]);

  const proposalsList = proposals.proposals || [];

  return (
    <div className="w-full flex  justify-center content-center items-center self-center">
      <div className="flex flex-row flex-wrap gap-6 p-6 max-w-6xl items-center justify-center">
        {proposalsList.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            onClick={onCardClick}
            proposal={proposal}
          />
        ))}
      </div>
    </div>
  );
}
