import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatisticBar } from '../components';

const tGroupA = { title: 'groupA', percentage: 50 };
const tGroupB = { title: 'groupB', percentage: 25 };

const tFaultyGroup = { title: 'groupB', percentage: -1 };
describe('Render statistic bar', () => {
  it('Should render null', () => {
    render(<StatisticBar groupA={tFaultyGroup} groupB={tGroupB} />);
    expect(screen.queryByTestId('statisticBar')).toBeNull();
  });

  it('Should render with correct styling', () => {
    render(<StatisticBar groupA={tGroupA} groupB={tGroupB} />);
    const groupA = screen.getByTestId('groupA');
    const groupB = screen.getByTestId('groupB');

    expect(groupA).toHaveStyle(`flex-basis: ${tGroupA.percentage}%`);
    expect(groupB).toHaveStyle(`flex-basis: ${tGroupB.percentage}%`);
  });
});
