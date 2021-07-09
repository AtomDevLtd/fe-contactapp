<template>
    <div>
        <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div>
                <ManageKlaviyoForm :user="$auth.user" />

                <SectionBorder />
            </div>
        </div>
    </div>
</template>

<router>
{
  path: "/integrations/klaviyo/",
  name: "ManageKlaviyoIntegration"
}
</router>

<script>
import ManageKlaviyoForm from './ManageKlaviyoForm'
import SectionBorder from '~/components/SectionBorder'

export default {
    components: {
        SectionBorder,
        ManageKlaviyoForm
    }
}
</script>
