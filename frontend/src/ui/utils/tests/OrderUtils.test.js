import { OrderUtils } from '../OrderUtils';

test('getWorkflowOrdered empty map', () => {
  expect(OrderUtils.getWorkflowOrdered([])).toStrictEqual({});
});

test('getWorkflowOrdered null map', () => {
  expect(OrderUtils.getWorkflowOrdered(null)).toStrictEqual({});
});

test('getWorkflowOrdered ordered map', () => {
  const workflowSteps = [
    {
      id: 1,
      label: 'Workflow 1',
      step_id: 1,
      step_order: 1,
      type_label: 'corte',
    },
    {
      id: 2,
      label: 'Workflow 2',
      step_id: 4,
      step_order: 2,
      type_label: 'abisagrado',
    },
    {
      id: 2,
      label: 'Workflow 2',
      step_id: 3,
      step_order: 1,
      type_label: 'corte',
    },
    {
      id: 1,
      label: 'Workflow 1',
      step_id: 2,
      step_order: 2,
      type_label: 'abisagrado',
    },
  ];

  const w1 = [
    { id: 1, order: 1, activity: 'corte' },
    { id: 2, order: 2, activity: 'abisagrado' },
  ];
  const w2 = [
    { id: 3, order: 1, activity: 'corte' },
    { id: 4, order: 2, activity: 'abisagrado' },
  ];

  const orderedWorkFlowSteps = OrderUtils.getWorkflowOrdered(workflowSteps);

  const stepsOrderW1 = orderedWorkFlowSteps[1].steps;
  const stepsOrderW2 = orderedWorkFlowSteps[2].steps;

  expect(stepsOrderW1[0].order).toBe(w1[0].order);
  expect(stepsOrderW1[1].order).toBe(w1[1].order);

  expect(stepsOrderW2[0].order).toBe(w2[0].order);
  expect(stepsOrderW2[1].order).toBe(w2[1].order);
});

test('getEndDate date is null', () => {
  expect(OrderUtils.getEndDate(0, null)).toBe(null);
});

test('getEndDate current day', () => {
  const date = OrderUtils.getEndDate(100, new Date('2022-05-06'));
  expect(date.toDateString()).toBe(new Date('2022-05-06').toDateString());
});

test('getEndDate next day', () => {
  const date = OrderUtils.getEndDate(200, new Date('2022-05-06'));
  expect(date.toDateString()).toBe(new Date('2022-05-07').toDateString());
});

test('getEndDate next 2 days', () => {
  const date = OrderUtils.getEndDate(500, new Date('2022-05-06'));
  expect(date.toDateString()).toBe(new Date('2022-05-08').toDateString());
});

test('getEndDate next 4 days', () => {
  const date = OrderUtils.getEndDate(501, new Date('2022-05-06'));
  expect(date.toDateString()).toBe(new Date('2022-05-10').toDateString());
});

test('getEndDate pieces negative', () => {
  const date = OrderUtils.getEndDate(-1, new Date('2022-05-06'));
  expect(date).toBe(null);
});
