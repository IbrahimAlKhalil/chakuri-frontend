<script>
import loading from './components/loading'

export default {
  data () {
    return {
      signedIn: null
    }
  },

  created () {
    this.$root.$auth.initialize().then(user => {
      this.signedIn = !!user
    })
  },

  components: { loading },

  render (createElement) {
    if (this.signedIn === null) {
      return createElement('loading', {
        props: {
          loading: this.signedIn == null
        }
      })
    }

    return createElement('router-view')
  }
}
</script>
