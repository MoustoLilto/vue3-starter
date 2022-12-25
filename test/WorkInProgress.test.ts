import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import WorkInProgress from '@/components/generic/WorkInProgress.vue';

describe('WorkInProgress.vue', () => {
    it('should render', () => {
        const wrapper = mount(WorkInProgress);
        expect(wrapper.text()).toContain('travaillent actuellement');
    });
});
