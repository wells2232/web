// import { useEffect, useState } from 'react';
import { ProposalCard } from './ProposalCard';

export function ProposalList({ proposals, onCardClick }) {
  //   const [proposals, setProposals] = useState([]);

  const proposalsList = proposals.proposals || [];

  return (
    <div className="flex w-full content-center items-center justify-center self-center">
      <div className="flex max-w-6xl flex-row flex-wrap items-center justify-center gap-6 p-6">
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
