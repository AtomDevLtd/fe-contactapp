<template>
    <div>
        <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div>
                <UpdateProfileInformationForm :user="$auth.user" />

                <SectionBorder />
            </div>

            <div>
                <UpdatePasswordForm class="mt-10 sm:mt-0" />

                <SectionBorder />
            </div>
        </div>
    </div>
</template>

<router>
{
  path: "/profile/",
  name: "Profile"
}
</router>

<script>
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateProfileInformationForm from './UpdateProfileInformationForm'
import SectionBorder from '~/components/SectionBorder'

export default {
    components: {
        SectionBorder,
        UpdatePasswordForm,
        UpdateProfileInformationForm
    }
}
</script>
